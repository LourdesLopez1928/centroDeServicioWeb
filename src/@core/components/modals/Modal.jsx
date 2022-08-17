import useLockBodyScroll from "src/@core/hooks/useLockBodyScroll";
import useWindowSize from "src/@core/hooks/useWindowSize";

export default function Modal({ onClose, children,locked }){
    const size = useWindowSize();

    // <ConditionalRender cond={size.width < 1024}>
    // mt-5 pt-24
    useLockBodyScroll();

    // console.log(size);

    const handleClose =()=>{
        if (locked) {
            return 
        }

        if(typeof onClose === "function"){
            onClose();
        }
    }

    // -mt-5
    return <div className={`fixed filter-blur z-50 bg-black bg-opacity-20 ${size.width < 1024 ? '' : ''}`}>
    <div onClick={handleClose} className={`absolute inset-0`} />
        <div className={`w-screen h-screen`}>
            <div className={`flex justify-center items-center h-screen z-50 ${size.width < 1024 ? 'overflow-y-auto' : 'mt-5'} `}>
                <div className={`flex justify-center items-center h-full w-full py-32`}>
                    <div className={`relative overflow-hidden ${size.width < 1024 ? 'w-80' : 'w-96 rounded-3xl'} ${size.width < 768 ? 'w-full' : 'w-96 rounded-3xl'}`}>
                        {
                            children
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
}