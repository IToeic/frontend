import grayscale from "../assets/images/grayscale_logo.png";

const Footer = () => {
  return (
    <footer className="text-center text-xs sm:text-sm text-gray-400 border-t pt-2 sm:pt-4">
      ⓒ Mojuk - KSY, GYR, OCR, YSM, HGY
      <div className="text-sm sm:text-xl mt-1 sm:mt-3 font-semibold justify-center flex items-center h-10 ">
        <img className="h-20" src={grayscale} alt="grayscale_logo" />
      </div>
    </footer>
  );
};

export default Footer;
