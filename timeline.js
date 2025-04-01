const data = [
    { year: 2017, event: "Internship at Red Solar", category: "Academia", link: "#internship-2017" },
    { year: 2018, event: "Founded Wendlo", category: "Academia", link: "#wendlo" },
    { year: 2019, event: "Industry Experience (Incor)", category: "Industry", link: "#incor" },
    { year: 2020, event: "Graduated (GITAM)", category: "Academia", link: "#graduated" },
    { year: 2021, event: "Research Intern (IIT Bhilai)", category: "Research", link: "#iit-bhilai" },
    { year: 2022, event: "Research Assistant (IIT Palakkad)", category: "Research", link: "#iit-palakkad" },
    { year: 2023, event: "Research Intern (IIIT Nagpur)", category: "Research", link: "#iiit-nagpur" },
    { year: 2024, event: "Research Assistant (IIT Ropar)", category: "Research", link: "#iit-ropar" }
];

// Set up SVG canvas
const svg = d3.select(".timeline"),
      width = window.innerWidth - 40,
      height = 400,
      margin = { top: 50, left: 100, right: 100, bottom: 50 };

svg.attr("width", width).attr("height", height);

// Scale for positioning the events on the x-axis (years)
const xScale = d3.scaleLinear()
    .domain([2017, 2024])  // Start from 2017, end at 2024
    .range([margin.left, width - margin.right]);

const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
svg.append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(xAxis);

// Tooltip setup
const tooltip = d3.select(".tooltip");

// Draw circles for each event
svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.year))
    .attr("cy", height / 2)
    .attr("r", 10)
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

// Add text labels for events
svg.selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .attr("x", d => xScale(d.year))
    .attr("y", height / 2 - 20)
    .attr("text-anchor", "middle")
    .attr("font-size", "14px")
    .text(d => d.event)
    .style("font-family", "Arial, sans-serif")
    .style("fill", "black");

// Add start and end markers
svg.append("line")
    .attr("x1", margin.left)
    .attr("y1", height / 2 + 30)
    .attr("x2", width - margin.right)
    .attr("y2", height / 2 + 30)
    .attr("stroke", "#aaa")
    .attr("stroke-width", 2);

svg.append("circle")
    .attr("cx", margin.left)
    .attr("cy", height / 2 + 30)
    .attr("r", 5)
    .attr("fill", "black");

svg.append("circle")
    .attr("cx", width - margin.right)
    .attr("cy", height / 2 + 30)
    .attr("r", 5)
    .attr("fill", "black");
