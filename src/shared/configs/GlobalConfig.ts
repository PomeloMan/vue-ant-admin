import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const settingModule = namespace('setting');
@Component
export default class GlobalConfig extends Vue {
  @settingModule.Getter('tableSize') tableSize!: 'default' | 'middle' | 'small';
  @settingModule.Getter('paginationHeight') paginationHeight!: number;
  @settingModule.State('tableInnerScroll') tableInnerScroll!: boolean;
}
