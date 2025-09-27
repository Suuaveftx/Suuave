// "use client";
// import React, { useState } from "react";
// import { InputOtp, InputOtpSlot } from "@heroui/react";

// const OtpValue = () => {
//   const [value, setValue] = useState("");

//   return (
//     <div className="flex flex-col items-center gap-4">
//       <h1 className="text-lg font-semibold">Enter OTP</h1>

//       <InputOtp
//         length={6}
//         value={value}
//         onValueChange={setValue}
//         render={({ slots }) => (
//           <div className="flex gap-2">
//             {slots.map((slot, index) => (
//               <InputOtpSlot
//                 key={index}
//                 {...slot}
//                 className={`w-12 h-12 flex items-center justify-center rounded-md border-2 text-lg font-semibold transition-colors 
//                   ${slot.char
//                     ? "border-green-500 text-green-700"
//                     : "border-gray-300 text-gray-400"}
//                   ${slot.isActive ? "ring-2 ring-blue-400" : ""}
//                 `}
//               />
//             ))}
//           </div>
//         )}
//       />
//     </div>
//   );
// };

// export default OtpValue;
