import React from 'react';
import { IDefaultPageProps } from '#types/default';
import getOrgCourseList from '@apis/getOrgCourseList';
import Error from '@components/common/Error';
import Form from './form';

export const dynamic = 'force-dynamic';

export default async function Page({
  searchParams,
}: IDefaultPageProps<Record<string, string | string[]>>) {
  const response = await getOrgCourseList(searchParams, 0);
  const res = await response.json();

  if (!response.ok) {
    return <Error error={{ message: res.message as string }} />;
  }

  return <Form {...res} />;
}
