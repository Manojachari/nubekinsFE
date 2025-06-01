import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import certificationBanner from '../assets/certification-banner.jpg';


function CoursePage() {
  const { id } = useParams();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/courses`)
      .then(response => {
        setCourses(response.data);
        if (id) {
          const course = response.data.find(c => c._id === id);
          setSelectedCourse(course || response.data[0]);
        } else {
          setSelectedCourse(response.data[0]);
        }
      })
      .catch(error => console.error(error));
  }, [id]);

  return (
    <div>
      <Header />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-20 bg-blue-900"
      >
        <div className="container mx-auto px-4">
           <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.8 }}
                     className="relative overflow-hidden rounded-2xl mb-12"
                   >
                     <div className="absolute inset-0 bg-gradient-to-r from-green-600/50 to-green-600/50 z-10" />
                     <img
                       src={certificationBanner}
                       alt="Certifications"
                       className="w-full h-80 object-cover"
                     />
                     <div className="absolute inset-0 flex items-center justify-center z-20">
                       <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
                         Courses Offered
                       </h1>
                     </div>
                   </motion.div>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 mb-8 md:mb-0">
              <h2 className="text-2xl font-bold mb-4">Courses</h2>
              <ul className="space-y-2">
                {courses.map(course => (
                  <li
                    key={course._id}
                    onClick={() => setSelectedCourse(course)}
                    className={`cursor-pointer p-2 rounded-lg ${selectedCourse?._id === course._id ? 'bg-blue-600' : 'hover:bg-blue-700'}`}
                  >
                    {course.title}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-2/3">
              {selectedCourse && (
                <div>
                  <h2 className="text-3xl font-bold mb-4">{selectedCourse.title}</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    {selectedCourse.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.section>
      <Footer />
    </div>
  );
}

export default CoursePage;