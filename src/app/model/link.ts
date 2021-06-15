import {Node} from './node';
import * as d3 from 'd3';

//Implementing SimulationLinkDatum interface into our custom Link class
export class Link implements d3.SimulationLinkDatum<Node>{
  //Optional - discussing optional implementation properties - required for relevant typing assistance
  index ?: number;
  //Must - defining enforced implementation properties
  source: Node | string | number;
  target: Node | string | number;
  constructor (source, target) {
  this.source = source;
  this.target = target;
  }
}
