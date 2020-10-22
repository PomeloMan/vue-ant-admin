import Vue from 'vue';
import { AxiosInstance } from 'axios';

declare module 'vue/types/vue' {
  interface Vue {
    $api: any;
    $http: AxiosInstance;
    $moment: moment.Moment;
    $accounting: accounting.Static;
  }
}
