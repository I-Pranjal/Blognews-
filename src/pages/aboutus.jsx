import React from 'react'

export default function AboutUs() {
return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className='max-w-4xl mx-auto w-full space-y-12'>
            <div className="text-center">
                <h1 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4 animate-fade-in'>
                    About Our Blog Platform
                </h1>
                <p className="mt-2 text-lg text-gray-600">
                    Delivering quality content and exceptional user experience since 2023
                </p>
            </div>
            
            <div className='grid md:grid-cols-2 gap-8'>
                <div className='bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
                    <h2 className='text-2xl font-semibold text-gray-700 mb-4 flex items-center'>
                        <span className="material-icons mr-2">📰</span>
                        News Coverage
                    </h2>
                    <p className='text-gray-600 leading-relaxed'>
                        Stay updated with the latest news and trending topics across various categories, 
                        delivered through our carefully curated content system. Our team ensures 
                        24/7 coverage of breaking news.
                    </p>
                </div>

                <div className='bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
                    <h2 className='text-2xl font-semibold text-gray-700 mb-4 flex items-center'>
                        <span className="material-icons mr-2">💻</span>
                        User Experience
                    </h2>
                    <p className='text-gray-600 leading-relaxed'>
                        Enjoy a clean, responsive interface that works seamlessly across all devices, 
                        making your reading experience comfortable and enjoyable. Features dark mode 
                        and customizable text size.
                    </p>
                </div>

                <div className='bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
                    <h2 className='text-2xl font-semibold text-gray-700 mb-4 flex items-center'>
                        <span className="material-icons mr-2">📱</span>
                        Categories
                    </h2>
                    <p className='text-gray-600 leading-relaxed'>
                        Browse through diverse categories including technology, lifestyle, sports, 
                        and more, all organized for easy navigation. Personalize your feed based 
                        on your interests.
                    </p>
                </div>

                <div className='bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
                    <h2 className='text-2xl font-semibold text-gray-700 mb-4 flex items-center'>
                        <span className="material-icons mr-2">🔄</span>
                        Regular Updates
                    </h2>
                    <p className='text-gray-600 leading-relaxed'>
                        Get fresh content daily with our committed team of writers and editors 
                        bringing you the most relevant news and stories. Subscribe to notifications 
                        for instant updates.
                    </p>
                </div>
            </div>

            <div className="text-center mt-12">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                    Start Reading Now
                </button>
            </div>
        </div>
    </div>
)
}
