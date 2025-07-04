// import AuthModel from "@/model/Auth.model";
// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { handleCors, corsHeaders } from "@/lib/cors"; 


// export async function POST(request) {

//    const cors = handleCors(req);
//   if (cors) return cors;


//   try {
//     const data = await request.json();
//     // console.log("Received data:", data);

//     const { referralCode, name, email, contactNo, password } = data;

//     // Connect to DB
//     await connectDB();

//     // Check if user already exists
//     const existedUser = await AuthModel.findOne({ email });
//     if (existedUser) {
//       return NextResponse.json(
//         { error: "User already exists" },
//         { status: 409,
//         headers: corsHeaders()}

//       );
//     }

//     // ✅ Clean and parse referral code
//     let numericCode = parseInt(referralCode.replace("HF", ""));
//     if (isNaN(numericCode)) {
//       return NextResponse.json(
//         { error: "Invalid referral code. Must be in the format 'HF123456'" },
//         { status: 400,
//          headers: corsHeaders()}
//       );
//     }

//     // ✅ Add 4 and format as HFxxxxxx
//     numericCode += 4;
//     let formattedReferralCode = `HF${numericCode}`;
//     // console.log("Initial formatted referral code:", formattedReferralCode);

//     // ✅ Ensure uniqueness
//     let isUnique = false;
//     while (!isUnique) {
//       const existingReferral = await AuthModel.findOne({
//         code: formattedReferralCode,
//       });
//       if (existingReferral) {
//         numericCode += 4;
//         formattedReferralCode = `HF${numericCode}`;
//       } else {
//         isUnique = true;
//       }
//     }

//     // ✅ Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);
//     console.log("Hashed password:", hashedPassword, formattedReferralCode);
//     // ✅ Create new user
//     const newUser = await AuthModel.create({
//       code: formattedReferralCode,
//       referralCode: referralCode,
//       name,
//       email,
//       contactNo,
//       password: hashedPassword,
//       role: "user",
//     });

//     // ✅ Prepare token payload
//     const token = jwt.sign(
//       {
//         id: newUser._id,
//         name: newUser.name,
//         role: newUser.role,
//         email: newUser.email,
//         referralCode: newUser.referralCode,
//         code: newUser.code,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     return NextResponse.json(
//       {
//         message: "User created successfully",
//         user: {
//           _id: newUser._id,
//           name: newUser.name,
//           email: newUser.email,
//           role: newUser.role,
//         },
//         token,
//       },
//       { status: 201,
//        headers: corsHeaders()}
//     );
//   } catch (error) {
//     // console.error("Error creating user:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500,
//        headers: corsHeaders()}
//     );
//   }
// }


import AuthModel from "@/model/Auth.model";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { handleCors, corsHeaders } from "@/lib/cors";

export async function POST(request) {
  // ✅ Correct this line
  const cors = handleCors(request);
  if (cors) return cors;

  try {
    const data = await request.json();
    const { referralCode, name, email, contactNo, password } = data;

    await connectDB();

    const existedUser = await AuthModel.findOne({ email });
    if (existedUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409, headers: corsHeaders() }
      );
    }

    let numericCode = parseInt(referralCode.replace("HF", ""));
    if (isNaN(numericCode)) {
      return NextResponse.json(
        { error: "Invalid referral code. Must be in the format 'HF123456'" },
        { status: 400, headers: corsHeaders() }
      );
    }

    numericCode += 4;
    let formattedReferralCode = `HF${numericCode}`;
    let isUnique = false;

    while (!isUnique) {
      const existingReferral = await AuthModel.findOne({ code: formattedReferralCode });
      if (existingReferral) {
        numericCode += 4;
        formattedReferralCode = `HF${numericCode}`;
      } else {
        isUnique = true;
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await AuthModel.create({
      code: formattedReferralCode,
      referralCode,
      name,
      email,
      contactNo,
      password: hashedPassword,
      role: "user",
    });

    const token = jwt.sign(
      {
        id: newUser._id,
        name: newUser.name,
        role: newUser.role,
        email: newUser.email,
        referralCode: newUser.referralCode,
        code: newUser.code,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
        token,
      },
      { status: 201, headers: corsHeaders() }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers: corsHeaders() }
    );
  }
}

// ✅ This is required for CORS preflight (OPTIONS method)
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders() });
}
