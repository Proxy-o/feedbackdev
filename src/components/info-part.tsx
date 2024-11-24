"use client";
import React from "react";
import { BackgroundBeams } from "./background-beams";
import { Building2, Heart, Star, Users } from "lucide-react";
import { Card } from "./ui/card";

export default function InfoPart() {
  return (
    <div className="flex-1 flex items-stretch ">
      {/* Right side content */}
      <Card className=" flex flex-col justify-center space-y-8 p-4 bg-secondary/30 my-8">
        <div>
          <h2 className="text-4xl font-bold mb-4  p-2 text-center">
            Welcome to Our App
          </h2>
          <p className="text-2xl text-gray-600">
            Discover and share meaningful experiences with companies around the
            world
          </p>
        </div>

        <ul className="space-y-6 ml-6">
          <li className="flex items-center space-x-4">
            <Building2 className="w-6 h-6 " />
            <span className="text-l">
              Browse through company profiles or create new ones
            </span>
          </li>
          <li className="flex items-center space-x-4">
            <Star className="w-6 h-6 " />
            <span className="text-l">
              Share your experiences through detailed reviews and ratings
            </span>
          </li>
          <li className="flex items-center space-x-4">
            <Users className="w-6 h-6 " />
            <span className="text-l">
              Connect with others and help them make informed decisions
            </span>
          </li>
        </ul>

        <div className="space-y-4">
          <p className="text-2xl font-medium">
            Join our growing community today!
          </p>
          <p className="text-l text-gray-600 flex items-center">
            <Heart className="w-6 h-6  mr-2" />
            Your insights make a difference
          </p>
        </div>
      </Card>
      <BackgroundBeams className="absolute inset-0" />
    </div>
  );
}
