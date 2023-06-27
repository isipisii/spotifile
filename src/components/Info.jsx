"use client";
import { useDispatch, useSelector } from "react-redux";
import { AiFillInfoCircle } from "react-icons/ai";
import { closeInfoModal, openInfoModal } from "@/slice/modalSlice";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const Info = () => {
  const dispatch = useDispatch();
  const { isInfoModalOpen } = useSelector((state) => state.modal);
  const pathname = usePathname();
  const shouldShow = () => pathname === "/" || pathname === "/sign-in";

  return (
    <>
      {shouldShow() && (
        <div
          className="fixed bottom-[5rem] md:bottom-5 right-5 z-10 "
          onClick={() => dispatch(openInfoModal())}
        >
          <AiFillInfoCircle className="text-white text-[2rem]" />
        </div>
      )}

      <AnimatePresence>
        {isInfoModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ type: "tween" }}
              className="max-w-[500px] w-[90%] z-50 bg-[#282828] p-6 rounded-xl flex flex-col gap-6"
            >
              <h1 className="text-white text-center font-bold text-[1.3rem] md:text-[1.5rem] ">
                Disclaimer
              </h1>
              <p className="text-[#a8a5a5] text-center text-[.9rem] md:text-[1rem]">
                This application do not collect or store user's information.
                This was made for learning purposes only.
              </p>
              <button
                className="text-white font-semibold hover:bg-green-500 bg-green-600 text-[.8rem] md:text-[.9rem] py-3 rounded-full"
                onClick={() => dispatch(closeInfoModal())}
              >
                I understand
              </button>
              <p className="text-[#a8a5a5] text-center text-[.6rem]">
                Made with love by Alessandro Benig.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Info;
