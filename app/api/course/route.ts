import {
  IEliceResponse,
  IErrorResponses,
  IOrgCourseListResponses,
} from '#types/course';
import { ESSENTIAL_COURSE_KEYS } from '@constants/course';
import { NextRequest, NextResponse } from 'next/server';

export async function GET({ nextUrl }: NextRequest) {
  const { searchParams } = nextUrl;
  const queryString = searchParams.toString();
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REST_API}?${queryString}`,
    );
    const responseJSON = (await response.json()) as IEliceResponse;

    if (responseJSON?._result?.status === 'fail') {
      throw new Error((responseJSON as IErrorResponses).fail_message);
    }
    const result = {
      course_count: (responseJSON as IOrgCourseListResponses)?.course_count,
      courses: (responseJSON as IOrgCourseListResponses)?.courses?.map(
        (course) => {
          return ESSENTIAL_COURSE_KEYS.reduce((acc, cur) => {
            return { ...acc, [cur]: course[cur] };
          }, {});
        },
      ),
    };
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(error.message, {
      status: 500,
    });
  }
}
