d3.areaProportionalVenn = function(color_1, color_2, circle_1_area, circle_2_area, overlap){

    function areaProportionalVenn(color_1, color_2, circle_1_area, circle_2_area, overlap){
        if (overlap > circle_1_area || overlap > circle_2_area){
            return false;
        }

        if (overlap < 1){
            overlap = 0.1;
        }
        //clear the diagram
        var something=d3.select(".venn-diagram").selectAll("svg").remove();

        var height = 170;//overall height of svg div
        var width = 320; //overall width of svg div
        var x_padding = 10; //inner padding width needed for faux antialiasing
        var y_padding = 10; //inner padding height

        //calculatei/translate circle origins/size based on function params wrt the size constraints

        var cy = (height/2);// y is always the midpoint of the whole graph
        var cx1 = width/4 + x_padding/2;//the first circle should start in the right "box" but pushed over a smidge
        var cx2 = (3*width/4) - x_padding/2;//the 2nd circle x origin is 1/2 way into its box whos center is modified by the x_padding
        var max_radius = ((height - 2*y_padding) < (width/2 - x_padding))? (height - 2*y_padding)/2 :(width/2 - x_padding)/2; //the max radius is 1/2 the smaller dimension we have to play with taking into acount padding. in our case we know the limiting dimension is the y axis which has 130px available.

        //normalize all the areas to 1 area unit so that we can get good values for arccos
        var normalized_inputs = areaProportionalVenn.Normalize([circle_1_area, circle_2_area, overlap]);
        var r1=areaProportionalVenn.RadiusFromArea(normalized_inputs[0]);
        var r2=areaProportionalVenn.RadiusFromArea(normalized_inputs[1]);
        //overlap area is [2] which we will test against

        var max_distance = normalized_inputs[0]+normalized_inputs[1];//the furthest teh circles can be
        var interval = max_distance/1000; //how many slices we're going to try
        var min_distance = 0 + interval; //the minimum distance we want to translate the circles (if there's 0.0000001 area unit of overlap)
        var found_distance = -1;
        for (var i=min_distance;i<=max_distance;i=i+interval){
            //calculate the area. if the area is within 5% of our overlap then call it good (or increase the interval and decrease the acctable 5% to liek 1% or smaller

            calculated_area = (areaProportionalVenn.AreaOfOverlap(0,0, r1, i, 0, r2));
            if (isNaN(calculated_area)){
                continue;
            }

//        if ((calculated_area == normalized_inputs[2]) || (Math.round(1000 * calculated_area)/1000 == Math.round(1000 * normalized_inputs[2])/1000)){
            if (-0.000001 <= calculated_area - normalized_inputs[2] <= 0.000001 ){

                found_distance=i;
                break;
            }
        }
        if (found_distance == -1){
            found_distance =0;
        }

        var pre_translated = [r1, r2, found_distance];

        //now scale everything up to the max radius in the svg
        //var post_translated=IMWeb.Normalize(pre_translated, max_radius);
        if (r1>=r2){
            multiplier = max_radius/r1
        }else{
            multiplier = max_radius/r2
        }
        r1=Math.round(r1*multiplier);
        r2=Math.round(r2*multiplier);
        found_distance=Math.round(found_distance*multiplier);

        var post_translated=[r1, r2, found_distance];

        //create the graph


        var graph=d3.select(".venn-diagram")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        var Circle1Radius = [post_translated[0]];//how big is this circle?

        var Circle1 = graph.selectAll("circle1")
            .data(Circle1Radius)
            .enter()
            .append("circle")
            .attr("opacity", 0.8)
            .attr("fill", color_1)
            .attr("cx", cx1)
            .attr("cy", cy)
            .attr("r", function(d)
            {
                return d;
            }
        );

        var Circle2Radius = [post_translated[1]];//how big is this circle?

        var Circle2 = graph.selectAll("circle2")
            .data(Circle2Radius)
            .enter()
            .append("circle")
            .attr("opacity", 0.8)
            .attr("fill", color_2)
            .attr("cx", cx2)
            .attr("cy", cy)
            .attr("r", function(d)
            {
                return d;
            }
        );

        //now the important part - move circle 2 to the left and make it overlap circle 1
        //based on the overlap
           Circle2.transition()
         .attr("cx", cx1 + post_translated[2])
         .duration(1000)
         .delay(250);

        return areaProportionalVenn;

    }

    areaProportionalVenn.Normalize = function(unnormalized, normalize_to){
        var max_normalized_val = normalize_to || 1;
        var max_val = Math.max.apply(Math, unnormalized);
        var normalized=[];
        for (var i=0;i<unnormalized.length;i++){
            normalized.push(max_normalized_val * unnormalized[i]/max_val);
        }
        return normalized;
    };

    areaProportionalVenn.RadiusFromArea = function(area){
        return Math.sqrt(area/Math.PI);
    };

    areaProportionalVenn.AreaOfOverlap = function(x0,y0,r0,x1,y1,r1){
        var rr0 = r0*r0;
        var rr1 = r1*r1;
        var c = Math.sqrt((x1-x0)*(x1-x0) + (y1-y0)*(y1-y0));
        var phi = (Math.acos((rr0+(c*c)-rr1) / (2*r0*c)))*2;
        var theta = (Math.acos((rr1+(c*c)-rr0) / (2*r1*c)))*2;
        var area1 = 0.5*theta*rr1 - 0.5*rr1*Math.sin(theta);
        var area2 = 0.5*phi*rr0 - 0.5*rr0*Math.sin(phi);
        return area1 + area2;
    };

return  areaProportionalVenn(color_1, color_2, circle_1_area, circle_2_area, overlap);

//    return areaProportionalVenn;

};