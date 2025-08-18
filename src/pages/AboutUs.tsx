//@ts-nocheck

import FeatureCards from "@/components/FeatureCards";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>About Ganesh Pyro Park</title>
        <meta
          name="description"
          content="Learn about Ganesh Pyro Park, your trusted cracker supplier from Sivakasi. Delivering safe and affordable fireworks across India."
        />
        <meta
          name="keywords"
          content="about Ganesh Pyro Park, sivakasi cracker company, trusted fireworks dealer, crackers city, fireworks brand"
        />

        <meta
          property="og:title"
          content="About Us - Ganesh Pyro Park"
        />
        <meta
          property="og:description"
          content="We are a leading cracker supplier based in Sivakasi, offering quality fireworks at unbeatable prices."
        />
        <meta property="og:image" content="/meta/about-us.jpg" />
        <meta property="og:url" content="https://fromsivakasicrackers.com/aboutus" />
      </Helmet>
      <section className="bg-white py-16 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Text Content */}
          <div>
            <h2 className="text-4xl font-bold mb-6 text-gray-800">
              We are the leading supplier of crackers & fancy crackers
            </h2>

            <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
              <p>
                Welcome to Ganesh Pyro Park, located in the vibrant city of Sivakasi, Tamil Nadu. As the festive season approaches, our shop is the ultimate destination for all your Diwali cracker needs. Conveniently situated in the heart of Sivakasi, we offer a wide range of high-quality fireworks and crackers to make your Diwali celebration truly spectacular.
              </p>
              <p>
                At Ganesh Pyro Park, we pride ourselves on providing a diverse selection of fireworks that cater to every preference and budget. From vibrant sparklers and dazzling flower pots to mesmerizing aerial shells and awe-inspiring display fireworks, our shop is a haven for fireworks enthusiasts. We source our products from reputable manufacturers in Sivakasi, ensuring that each item meets stringent quality and safety standards..
              </p>
            </div>

            {/* Stats */}
            <div className="mt-10 bg-gray-50 rounded-xl p-6 grid grid-cols-3 gap-4 text-center shadow-md">
              <div>
                <h3 className="text-4xl font-bold text-emerald-500">1.2k</h3>
                <p className="font-semibold mt-1">Vendors</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-emerald-500">410k</h3>
                <p className="font-semibold mt-1">Customers</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-emerald-500">34k</h3>
                <p className="font-semibold mt-1">Products</p>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div className="rounded-xl bg-gray-100 overflow-hidden shadow-md">
            <img
              src="/logo.png" // Adjust if needed
              alt="About Ganesh Pyro Park"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <FeatureCards />
      </section>
      <Footer />
    </>
  );
};

export default AboutUs;
