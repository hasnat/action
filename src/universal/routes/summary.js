import {resolvePromiseMap} from 'universal/utils/promises';
import makeReducer from 'universal/redux/makeReducer';

const setMeetingImports = () =>
  new Map([
    ['component', System.import(
      'universal/modules/summary/components/MeetingSummary/MeetingSummary')]
  ]);

const getMeetingImports = importMap => ({
  component: importMap.get('component')
});

export default store => ({
  path: 'summary/:teamId/:meetingId',
  getComponent: async(location, cb) => {
    const promiseMap = setMeetingImports();
    const importMap = await resolvePromiseMap(promiseMap);
    const {component, ...asyncReducers} = getMeetingImports(importMap);
    cb(null, component);
  }
});