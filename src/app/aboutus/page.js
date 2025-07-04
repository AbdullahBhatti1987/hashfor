import FlagComponent from "@/components/FlagComponents/FlagComponent";
import ReactorMessage from "../reactormessage/page";
import Footer from "@/components/footer/page";

function WhyChooseHashfor() {
  return (
    <>
    <div 
    className=" bg-gold-gradient"
   style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
    <FlagComponent />
    <ReactorMessage />
    <Footer />
    </div>
    </>
  );
}

export default WhyChooseHashfor;
