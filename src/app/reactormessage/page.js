import Image from "next/image";
import React from "react";

function ReactorMessage () {
    return (
        <>
      <section className="relative flex justify-center py-12 px-4">
               
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-[var(--themeColor)] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-[var(--themeColor)] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-[var(--themeColor)] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      
        <div className="relative w-full max-w-6xl">
          <div className=" p-1 rounded-3xl shadow-2xl">
            <div className="bg-black/60 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 backdrop-blur-sm">
              {/* Image with elegant frame */}
              <div className="w-full md:w-2/5 flex justify-center relative group">
                <div className="absolute -inset-1 bg-[var(--themeColor)] rounded-2xl opacity-75 group-hover:opacity-100 blur transition duration-200"></div>
                <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-gray-700 group-hover:border-transparent transition duration-300">
                  <Image
                    src="/ceo1.jpg"
                    alt="Reactor"
                    width={400}
                    height={500}
                    unoptimized
                    className="w-full h-auto object-cover rounded-xl transform group-hover:scale-105 transition duration-500"
                  />
                </div>
              </div>
              
              {/* Text content with animated elements */}
              <div className="w-full md:w-3/5 space-y-8">
                <div className="text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-[var(--themeColor)] mb-6">
                    MESSAGE FROM RECTOR
                  </h2>
                  
                  <div className="relative">
                    {/* <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 h-16 w-1 bg-[var(--themeColor)] rounded-full hidden md:block"></div> */}
                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed italic">
                      I believe that the strength in our team and our ability to deal with
adversities is what makes us a great guide for our students. This is
why I&apos;m proud to be on this team.
                    </p>
                  </div>
                </div>
                
                <div className="text-center md:text-left pt-6 border-t border-gray-800">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    <span className="bg-clip-text text-transparent bg-[var(--themeColor)]">
                      TEAM WORK IS DREAM WORK
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        </>
    );
};

export default ReactorMessage;
