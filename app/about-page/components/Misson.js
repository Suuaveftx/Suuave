const Misson = () => {
    return (
       <section className="w-full bg-white py-20 px-6 md:px-20">
            <div className="max-w-3xl mx-auto text-center space-y-20">
             {/* Vision */}

             <div>
                <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 uppercase mb-6 ">
                Our Vision
                </h3>
                <p className="text-gray-600">   
                to be the foremost go-to platform for discovering and connecting with <br /> talented African creatives,
                and unlocking new levels of innovation in the <br /> African fashion industry.
                </p>
             </div>

                {/* Mission */}
                    <div>
                        <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 uppercase mb-6">Our Mission</h3>
                        <p className="text-gray-600 leading-relaxed">
                        To create a streamlined network for our prospects to <br /> connect, collaborate and create.
                        </p>
                    </div>
            </div>
       </section>

    );
};

export default Misson;