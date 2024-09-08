import { NextResponse } from 'next/server';
import Student from '@/models/Student.model'; // Adjust the path as necessary
import Teacher from '@/models/Teacher.model';

// Define threshold values for good and bad behavior
const THRESHOLD_GOOD = 50; // Example threshold for good behavior
const THRESHOLD_BAD = 20;  // Example threshold for bad behavior

export async function POST(request: Request) {
  const { teacherName } = await request.json();
  console.log(teacherName)
  if (!teacherName) {
    return NextResponse.json({ error: 'Teacher username is required' }, { status: 400 });
  }

  try {
    // Find all students
    const teacher = await Teacher.findOne({username:teacherName}).populate('students').exec();
    const students = teacher.students;
    console.log(students)
    const goodStudents: any[] = [];
    const badStudents: any[] = [];

    for (const student of students) {
      const behaviorData = await student.get7DayBehaviorData(teacherName);
      console.log(behaviorData)
      if (!behaviorData) continue;

      const averageBehaviorScore =
        behaviorData.hand_raising +
        behaviorData.reading +
        behaviorData.turn_around +
        behaviorData.looking_forward +
        behaviorData.writing +
        behaviorData.using_phone +
        behaviorData.sleeping;

      const totalPoints = 7 * THRESHOLD_GOOD; // Example total points (7 behavior categories with max value as THRESHOLD_GOOD)
      const percentageBehavior = (averageBehaviorScore / totalPoints) * 100;

      // Classify students as good or bad based on threshold
      if (percentageBehavior >= THRESHOLD_GOOD) {
        goodStudents.push({
          username: student.username,
          behaviorData,
          reason: 'Good behavior across multiple categories',
        });
      } else if (percentageBehavior <= THRESHOLD_BAD) {
        badStudents.push({
          username: student.username,
          behaviorData,
          reason: 'Poor behavior in multiple categories',
        });
      }
    }

    return NextResponse.json({ goodStudents, badStudents });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
