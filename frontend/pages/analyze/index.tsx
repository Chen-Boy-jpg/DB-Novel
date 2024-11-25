import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { Box, HStack } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getAuthorCount } from "../api/author.request";

// DataType 用來描述每個作者和其小說數量的結構
type DataType = {
  name: string;
  value: number;
};

const Analyze = () => {
  const {
    data: authorCount,
    isLoading,
    isError,
  } = useQuery(["count-novel"], getAuthorCount);

  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!authorCount) return; // 如果沒有數據就不進行繪製

    const svg = d3.select(svgRef.current);
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    // 比例尺
    const x = d3.scaleLinear().range([0, width - margin.left - margin.right]);
    const y = d3
      .scaleBand()
      .range([0, height - margin.top - margin.bottom])
      .padding(0.1);

    // 顏色比例尺
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // 設置 SVG 實際的繪圖區域
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // 更新條形圖
    const updateBars = (data: DataType[]) => {
      // 設置比例尺範圍
      x.domain([0, Math.floor(d3.max(data, (d) => d.value)!)]);
      y.domain(data.map((d) => d.name));

      const bars = g
        .selectAll<SVGRectElement, DataType>(".bar")
        .data(data, (d) => d.name);

      // 進行 enter, update, exit 操作
      bars
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", (d) => y(d.name)!)
        .attr("width", 0) // 初始寬度為 0
        .attr("height", y.bandwidth())
        .attr("fill", (d, i) => colorScale(i.toString())) // 使用顏色比例尺來為每個條形圖指定顏色
        .merge(bars) // 合併 enter 和 update
        .transition()
        .duration(15000)
        .attr("width", (d) => x(d.value)); // 更新條形的寬度

      bars.exit().remove();
    };

    // 更新坐標軸
    const updateAxis = (data: DataType[]) => {
      g.selectAll(".x-axis").remove();
      g.selectAll(".y-axis").remove();

      // 找到小說數量的最大值，並根據這個值設置 x 軸的刻度數量
      const maxNovelCount = Math.max(...data.map((d) => d.value));

      // 添加 x 軸
      g.append("g")
        .attr("class", "x-axis")
        .attr(
          "transform",
          `translate(0,${height - margin.top - margin.bottom})`
        )
        .call(
          d3
            .axisBottom(x)
            .ticks(maxNovelCount) // 設置 x 軸刻度數量為最大小說數量
            .tickFormat(d3.format("d")) // 格式化為整數
        );

      // 添加 y 軸
      g.append("g").attr("class", "y-axis").call(d3.axisLeft(y));
    };

    // 轉換 authorCount 為 D3 可用的格式
    const d3Data = authorCount.map(
      (author: { aName: string; novel_count: number }) => ({
        name: author.aName,
        value: author.novel_count,
      })
    );

    // 更新圖表
    updateBars(d3Data);
    updateAxis(d3Data);
  }, [authorCount]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  return (
    <HStack
      w={"100%"}
      bgColor={"#ECEFF6"}
      pt={"10rem"}
      pb={"1rem"}
      display={"flex"}
      justify={"center"}
    >
      <Box
        w={"75%"}
        display={"flex"}
        gap={"2rem"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box>各作者小說的數量 </Box>
        <svg ref={svgRef} width="600" height="400"></svg>
      </Box>
    </HStack>
  );
};

export default Analyze;
