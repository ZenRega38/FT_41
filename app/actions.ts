'use server'

import { fetchStudentDetails } from '@/lib/sheets';

export async function getStudentData(nim: string) {
  return await fetchStudentDetails(nim);
}
