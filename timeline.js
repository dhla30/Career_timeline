<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Career Timeline</title>
    <script src="https://d3js.org/d3.v6.min.js"></script>
    <link rel="stylesheet" href="style.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
        }
        .timeline-container {
            position: relative;
            width: 100%;
            margin: 20px auto;
        }
        .tooltip {
            position: absolute;
            background: #333;
            color: #fff;
            padding: 5px 10px;
            border-radius: 5px;
            display: none;
            font-size: 14px;
        }
        svg {
            width: 90%;
            height: 200px;
        }
    </style>
</head>
<body>
    <h2>Career Timeline</h2>
    <div class="timeline-container">
        <svg class="timeline"></svg>
        <div class="tooltip"></div>
    </div>
    <script>
        const data = [
            { year: 2017, event: "Internship at Red Solar", category: "Industry", link: "#internship-2017" },
            { year: 2018, event: "Founded Wendlo", category: "Industry", link: "#wendlo" },
            { year: 2019, event: "Industry Experience (Incor)", category: "Industry", link: "#incor" },
            { year: 2020, event: "Graduated B.Tech (GITAM)", category: "Academia", link: "#graduation" },
            { year: 2021, event: "Research Intern (IIT Bhilai)", category: "Research", link: "#iit-bhilai" },
            { year: 2022, event: "Research Assistant (IIT Palakkad)", category: "Research", link: "#iit-palakkad" },
            { year: 2023, event: "Research Intern (IIIT Nagpur)", category: "Research", link: "#iiit-nagpur" },
            { year: 2024, event: "Research Assistant (IIT Ropar)", category: "Research", link: "#iit-ropar" }
        ];
        
        const svg = d3.select(".timeline"),
              width = window.innerWidth - 40,
              height = 200,
              margin = { top: 20, left: 100, right: 100, bottom: 50 };

        svg.attr("width", width).attr("height", height);

        const xScale = d3.scaleLinear()
            .domain([2017, 2024])
            .range([margin.left, width - margin.right]);

        const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
        
        svg.append("g")
            .attr("transform", `translate(0, ${height - margin.bottom})`)
            .call(xAxis);

        const tooltip = d3.select(".tooltip");

        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d.year))
            .attr("cy", height / 2)
            .attr("r", 8)
            .attr("fill", d => d.category === "Academia" ? "blue" : d.category === "Industry" ? "green" : "red")
            .attr("class", "event")
            .on("mouseover", (event, d) => {
                tooltip.style("display", "block")
                       .style("left", event.pageX + "px")
                       .style("top", event.pageY - 30 + "px")
                       .text(d.event);
            })
            .on("mouseout", () => tooltip.style("display", "none"))
            .on("click", (event, d) => window.location.href = d.link);
    </script>
</body>
</html>

