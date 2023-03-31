"use client";
import React from "react";
import { SwiperOptions } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

interface Props extends SwiperOptions {
    children: React.ReactNode;
}
export default function Slider({ children, ...props }: Props) {
    return (
        <Swiper {...props}>
            {React.Children.map(children, (child) => (
                <SwiperSlide style={{ width: "auto" }}>{child}</SwiperSlide>
            ))}
        </Swiper>
    );
}
