import { useLayoutEffect, useRef } from "react"
import {arc, interpolate, pie, scaleOrdinal, select} from 'd3'
import classes from './PieGraph.module.css'

const dims = {width: 500, height: 500, radius: 150}
const data = [
    {name: 'Percentage of women who encountered cancer', percentage: '12.9'},
    {name: 'Percentage of women who doesnt encounter cancer', percentage: '87.1'}
]


const PieGraph = () => {
    const canvasRef = useRef(null)

    useLayoutEffect(() => {
        const canvas = select(canvasRef.current)
        
        const svg = canvas.append('svg')
        .attr('class', classes.svg)
        // .attr('width', dims.width)
        // .attr('height', dims.height)
        
        const graph = svg.append('g')
        .attr('class', classes.graph)
        // .attr('transform', `translate(${dims.width/2}, ${dims.height/2})`)
        
        const pieChart = pie().value(d => d.percentage)
        
        const arcPath = arc().outerRadius(dims.radius).innerRadius(dims.radius/3)

        const colour = scaleOrdinal(['#fe019a','#C490E4']).domain(data.map(d => d.name))
        const arcTweenEnter = (d) => {
            var i = interpolate(d.endAngle - 0.1, d.startAngle)
        
            return function (t) {
                d.startAngle = i(t)
                return arcPath(d)
            }
        }
        // update
        const paths = graph.selectAll('path').data(pieChart(data)) 

        paths.exit().remove()

        paths.enter().append('path')
            .transition().duration(500)
            .attr('stroke', 'black')
            .attr('stroke-width', 1)
            .attr('d', arcPath)
            .attr('fill', d => colour(d.data.name))
            .attrTween('d', arcTweenEnter)
            
    }, [])

    return (
        <div ref={canvasRef}> </div>
    )
}

export default PieGraph