import * as d3 from 'd3';

//Implementing SimulationNodeDatum interface into our custom Node class
export class Node implements d3.SimulationNodeDatum {
//Optional - discussing optional implementation properties - required for relevant typing assistance
date ?: number;
x ?: number;
y ?: number;
vx ?: number;
vy ?: number;
fx ?: number | null;
fy ?: number | null;
id: string;
constructor (id, date) {
this.id = id;
this.date = date;
}
}
