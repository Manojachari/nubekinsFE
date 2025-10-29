import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/courses`)
      .then(response => setCourses(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <motion.section
      id="courses"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="py-20 bg-blue-900"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map(course => (
            <Link
              key={course._id}
              to={`/courses/${course._id}`}
              className="group relative overflow-hidden rounded-lg shadow-lg"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-xl font-semibold">{course.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default Courses;