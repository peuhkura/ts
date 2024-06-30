import diaryData from '../../data/entries'

import { Weather, Visibility, DiaryEntry } from '../types'


const diaries: DiaryEntry[] = diaryData as DiaryEntry[];

const getEntries = (): DiaryEntry[] => {
  return diaries;
}

const addDiary = () => {
  return null;
}

export default {
  getEntries,
  addDiary
};
