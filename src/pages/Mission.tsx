import React from 'react';
import ProgressBar from "@ramonak/react-progress-bar";

const Mission: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow">
        <ProgressBar completed={40} />
        <h2 className="text-2xl font-bold mb-2">Misi</h2>
        <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit consectetur ut aliquam qui dolore sed aut recusandae! Enim deleniti atque velit aliquid? Possimus nihil est obcaecati error, iusto consequuntur corrupti.</p>
        {/* <iframe className="w-full h-48 rounded-xl mb-4" src="https://maps.app.goo.gl/towCnbNwyQ7tLxB46" allowFullScreen></iframe> */}
        <iframe className="w-full h-48 rounded-xl mb-4" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d44619.77245401432!2d115.22191393898179!3d-8.70408705658873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sid!4v1752932685914!5m2!1sen!2sid"></iframe>
        <a href="https://maps.google.com" target="_blank" className="text-blue-600 underline">Lihat lokasi di Google Maps</a>
      </div>
    </div>
  );
};

export default Mission;