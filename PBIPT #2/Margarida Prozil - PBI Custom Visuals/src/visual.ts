/*
 *  Power BI Visual CLI
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

module powerbi.extensibility.visual {
    "use strict";
    export class Visual implements IVisual {
        private host: IVisualHost;
        private svg: d3.Selection<SVGElement>;
        private container: d3.Selection<SVGElement>;
        private circle: d3.Selection<SVGElement>;
        private backgroundImage: d3.Selection<SVGElement>;
        private textValue: d3.Selection<SVGElement>;
        private textLabel: d3.Selection<SVGElement>;
        private backgroundSVG: d3.Selection<SVGElement>;
        private visualSettings: VisualSettings;

        constructor(options: VisualConstructorOptions) {
            this.svg = d3.select(options.element)
                .append('svg')
                .classed('circleCard', true);

            this.backgroundSVG = this.svg.append('svg');
            this.backgroundImage = this.backgroundSVG.append('g').append("path")
                .attr("d", "m 452.753,321.453 c 0.041,45.508 -32.731,84.711 -77.295,92.419 -5.611,0.963 -11.277,1.533 -16.971,1.479 -1.92,-0.021 -2.674,0.747 -3.283,2.506 -8.897,25.544 -26.652,40.771 -53.473,44.611 -17.743,2.538 -33.844,-2.22 -47.958,-13.313 -1.966,-1.546 -3.168,-1.572 -5.218,-0.107 -16.508,11.807 -35.017,17.036 -55.229,15.815 -39.441,-2.381 -72.627,-32.526 -78.835,-71.398 -0.427,-2.687 -0.881,-5.394 -0.922,-8.102 -0.041,-2.252 -0.896,-3.121 -3.047,-3.542 -11.941,-2.328 -22.777,-7.246 -32.337,-14.729 -17.594,-13.775 -28.15,-31.761 -30.607,-54.009 -2.802,-25.464 5.063,-47.481 22.975,-65.828 1.444,-1.472 1.534,-2.497 0.549,-4.228 -6.886,-12.022 -10.15,-25.043 -9.62,-38.851 1.322,-34.461 25.302,-62.932 58.657,-69.981 3.859,-0.82 5.882,-2.333 7.578,-5.99 16.452,-35.445 44.076,-57.002 82.409,-64.112 26.909,-4.994 52.294,0.353 75.85,14.208 1.98,1.168 3.638,1.262 5.781,0.638 37.413,-10.855 70.564,-2.958 98.708,23.803 16.644,15.822 25.763,35.846 28.463,58.69 0.591,4.994 0.86,10.035 0.48,15.056 -0.143,1.899 0.441,2.693 2.239,3.358 16.866,6.243 28.496,17.885 33.584,35.105 6.337,21.42 1.014,40.203 -14.992,55.821 -1.387,1.356 -1.094,2.186 -0.308,3.541 8.459,14.573 12.841,30.259 12.822,47.14 z m -41.315,131.548 c 0.021,-12.498 -10.455,-22.948 -23.056,-22.982 -12.912,-0.047 -23.387,10.286 -23.443,23.104 -0.054,12.53 10.6,23.162 23.199,23.178 12.777,0.013 23.28,-10.489 23.3,-23.3 z M 21.931,261.48 C 34.083,261.507 44.308,251.35 44.26,239.307 44.205,227.244 34.198,217.242 22.148,217.208 9.798,217.175 -0.007,226.973 0,239.342 0.01,251.581 9.786,261.453 21.931,261.48 Z M 294.038,13.766 c -12.213,-0.068 -22.167,9.696 -22.236,21.8 -0.074,12.091 9.845,22.025 21.997,22.038 12.104,0.007 21.826,-9.689 21.848,-21.801 0.029,-12.171 -9.586,-21.976 -21.609,-22.037 z M 473.854,150.79 c -0.054,-10.036 -8.61,-18.571 -18.686,-18.639 -10.286,-0.074 -18.999,8.618 -18.93,18.883 0.073,10.239 8.379,18.448 18.679,18.462 10.611,0.021 18.997,-8.27 18.937,-18.706 z M 88.601,97.201 c 0,9.425 7.335,16.82 16.698,16.834 9.484,0.013 16.841,-7.422 16.807,-16.983 -0.034,-9.274 -7.382,-16.528 -16.712,-16.5 -9.595,0.019 -16.788,7.15 -16.793,16.649 z m 175.406,388.721 c 0.081,-7.85 -6.378,-14.315 -14.317,-14.343 -8.149,-0.025 -14.549,6.29 -14.528,14.33 0.021,7.931 6.388,14.214 14.394,14.214 7.999,0.007 14.382,-6.263 14.451,-14.201 z M 487.981,262.879 c -7.627,-0.055 -14.243,6.561 -14.182,14.181 0.066,7.53 6.352,13.712 13.964,13.727 7.98,0.015 13.965,-5.861 13.984,-13.747 0.022,-7.804 -6.106,-14.107 -13.766,-14.161 z M 152.997,-0.123 c -6.724,-0.027 -11.914,5.109 -11.914,11.8 0,6.649 5.244,11.819 11.962,11.785 6.52,-0.034 11.629,-5.232 11.629,-11.834 0.001,-6.663 -5.028,-11.717 -11.677,-11.751 z m 361.594,199.629 c -5.481,-0.062 -10.448,4.844 -10.517,10.401 -0.074,5.747 4.709,10.53 10.544,10.544 5.795,0.021 10.34,-4.485 10.381,-10.306 0.055,-5.855 -4.56,-10.565 -10.408,-10.639 z M 99.538,406.504 c 0.026,-5.564 -4.771,-10.354 -10.422,-10.407 -5.728,-0.049 -10.437,4.77 -10.396,10.632 0.047,5.727 4.695,10.251 10.484,10.211 5.68,-0.035 10.315,-4.71 10.334,-10.436 z");
                
            this.container = this.svg.append("g")
                .classed('container', true);
            this.textValue = this.container.append("text")
                .classed("textValue", true);
            this.textLabel = this.container.append("text")
                .classed("textLabel", true);
        }

        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration {
            const settings: VisualSettings = this.visualSettings || 
           VisualSettings.getDefault() as VisualSettings;
            return VisualSettings.enumerateObjectInstances(settings, options);
           }

        public update(options: VisualUpdateOptions) {
            let dataView: DataView = options.dataViews[0];
            let width: number = options.viewport.width;
            let height: number = options.viewport.height;
            this.svg.attr({
                width: width,
                height: height
            });
            
            this.visualSettings = VisualSettings.parse<VisualSettings>(dataView);
            
            this.visualSettings.circle.circleThickness = Math.max(0, this.visualSettings.circle.circleThickness);
            this.visualSettings.circle.circleThickness = Math.min(10, this.visualSettings.circle.circleThickness);

            this.backgroundSVG
                .attr("viewBox","0 0 500 500")
                .attr('preserveAspectRatio','xMidYMid');

            this.backgroundImage
                .style("fill", this.visualSettings.circle.circleColor)
                .style("fill-opacity", 1)
                .style("stroke-width", this.visualSettings.circle.circleThickness)

            let fontSizeValue: number = Math.min(width, height) / 5;
            this.textValue
                .text(dataView.single.value as string)
                .attr({
                    x: "50%",
                    y: "50%",
                    dy: "0.35em",
                    "text-anchor": "middle"
                }).style("font-size", fontSizeValue + "px");
            let fontSizeLabel: number = fontSizeValue / 4;
            this.textLabel
                .text(dataView.metadata.columns[0].displayName)
                .attr({
                    x: "50%",
                    y: height / 2,
                    dy: fontSizeValue / 1.2,
                    "text-anchor": "middle"
                })
                .style("font-size", fontSizeLabel + "px");
        }
    }
}