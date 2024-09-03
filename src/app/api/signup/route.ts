// import { NextRequest, NextResponse } from 'next/server'
// import dbConnect from '@/utils/dbConnect'
// import User from '@/models/User.model'
// import { writeFile } from 'fs/promises'
// import path from 'path'
// import fs from 'fs'

// export async function POST(request: NextRequest) {
//   await dbConnect()

//   try {
//     const formData = await request.formData()
//     const username = formData.get('username') as string
//     const password = formData.get('password') as string
//     const role = formData.get('role') as string

//     if (!username || !password || !role) {
//       return NextResponse.json({ success: false, message: 'Please provide all required fields' }, { status: 400 })
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ username })
//     if (existingUser) {
//       return NextResponse.json({ success: false, message: 'Username already exists' }, { status: 400 })
//     }

//     let imagePaths: { [key: string]: string | null } = { front: null, left: null, right: null, up: null }

//     if (role === 'student') {
//       const uploadDir = path.join(process.cwd(), 'public', 'uploads')

//       // Ensure the uploads directory exists
//       if (!fs.existsSync(uploadDir)) {
//         fs.mkdirSync(uploadDir, { recursive: true })
//       }

//       for (const [key, file] of Object.entries(imagePaths)) {
//         const imageFile = formData.get(`images.${key}`) as File | null
//         if (imageFile) {
//           const bytes = await imageFile.arrayBuffer()
//           const buffer = Buffer.from(bytes)

//           const fileName = `${username}_${key}${path.extname(imageFile.name)}`
//           const filePath = path.join(uploadDir, fileName)

//           try {
//             await writeFile(filePath, buffer)
//             imagePaths[key] = `/uploads/${fileName}`
//             console.log(`File saved successfully: ${filePath}`)
//           } catch (error:any) {
//             console.error(`Error saving file ${fileName}:`, error)
//             throw new Error(`Failed to save image: ${error.message}`)
//           }
//         }
//       }
//     }

//     // Create new user
//     const newUser = new User({
//       username,
//       password,
//       role,
//       images: imagePaths
//     })

//     // Save the user
//     await newUser.save()

//     // Return success response
//     return NextResponse.json({
//       success: true,
//       message: 'User registered successfully',
//       user: {
//         id: newUser._id,
//         username: newUser.username,
//         role: newUser.role,
//         images: newUser.images
//       }
//     }, { status: 201 })

//   } catch (error:any) {
//     console.error('Registration error:', error)
//     return NextResponse.json({ success: false, message: 'Error registering user', error: error.message }, { status: 500 })
//   }
// }
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User.model';
import { writeFile } from 'fs/promises';
import path from 'path';
import fs from 'fs';

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const formData = await request.formData();
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const role = formData.get('role') as string;

    if (!username || !password || !role) {
      return NextResponse.json(
        { success: false, message: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Username already exists' },
        { status: 400 }
      );
    }

    let imagePaths: { [key: string]: string | null } = { front: null, left: null, right: null, up: null };

    if (role === 'student') {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');

      // Ensure the uploads directory exists
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
        console.log('Uploads directory created:', uploadDir);
      }

      // Iterate over possible image keys
      for (const key of ['front', 'left', 'right', 'up']) {
        const imageFile = formData.get(`images.${key}`) as File | null;
        
        if (imageFile) {
          // console.log(`Processing file for ${key}:`, imageFile.name);

          // Convert image to buffer
          const bytes = await imageFile.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const fileName = `${username}_${key}${path.extname(imageFile.name)}`;
          const filePath = path.join(uploadDir, fileName);

          try {
            await writeFile(filePath, buffer);
            imagePaths[key] = `/uploads/${fileName}`;
            // console.log(`File saved successfully: ${filePath}`);
          } catch (error: any) {
            console.error(`Error saving file ${fileName}:`, error);
            throw new Error(`Failed to save image: ${error.message}`);
          }
        } else {
          console.log(`No file provided for ${key}`);
        }
      }
    }

    // Create new user
    const newUser = new User({
      username,
      password,
      role,
      images: imagePaths
    });

    // Save the user
    await newUser.save();

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
        role: newUser.role,
        images: newUser.images
      }
    }, { status: 201 });

  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'Error registering user', error: error.message },
      { status: 500 }
    );
  }
}
