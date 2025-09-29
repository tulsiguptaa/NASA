'use client';

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const GraphViewer: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Sample data - replace with actual data from your API
    const nodes = [
      { id: 'Microgravity', group: 1 },
      { id: 'Radiation', group: 1 },
      { id: 'Stem Cells', group: 2 },
      { id: 'Bone Loss', group: 3 },
      { id: 'Muscle Atrophy', group: 3 },
    ];

    const links = [
      { source: 'Microgravity', target: 'Bone Loss', value: 1 },
      { source: 'Microgravity', target: 'Muscle Atrophy', value: 1 },
      { source: 'Radiation', target: 'Stem Cells', value: 1 },
    ];

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    // Clear previous graph
    d3.select(svgRef.current).selectAll('*').remove();

    // Create the simulation
    const simulation = d3.forceSimulation(nodes as any)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2));

    // Add the links
    const link = d3.select(svgRef.current)
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', (d: any) => Math.sqrt(d.value));

    // Add the nodes
    const node = d3.select(svgRef.current)
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', 10)
      .attr('fill', (d: any) => d.group === 1 ? '#4299E1' : d.group === 2 ? '#48BB78' : '#F56565')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended) as any);

    // Add labels to the nodes
    const text = d3.select(svgRef.current)
      .selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .text((d: any) => d.id)
      .attr('font-size', 12)
      .attr('dx', 15)
      .attr('dy', 4);

    // Update positions on each tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y);

      text
        .attr('x', (d: any) => d.x)
        .attr('y', (d: any) => d.y);
    });

    // Drag functions
    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <svg 
      ref={svgRef} 
      className="w-full h-full bg-gray-800/30 rounded-lg"
      style={{ minHeight: '500px' }}
    />
  );
};

export default GraphViewer;