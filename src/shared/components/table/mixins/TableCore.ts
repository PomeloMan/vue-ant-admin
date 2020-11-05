import GlobalConfig from '@/shared/configs/GlobalConfig';
import { TableRowSelection } from 'ant-design-vue/types/table/table';
import { Component, Mixins, Vue, Watch } from 'vue-property-decorator';

const rowSelection = function(this: any): TableRowSelection {
  return {
    columnWidth: 50,
    onChange: (
      selectedRowKeys: Array<string | number>,
      selectedRows: Array<any>
    ) => {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
    }
  };
};

@Component
export default class TableCoreMixin<T> extends Mixins(Vue, GlobalConfig) {
  // 表格字段
  loading = false;
  dataSource: Array<T> = [];
  scroll: { x: number; y: number } = { x: 0, y: 0 };
  /** 查询条件 */
  dataSourceUrl = '';
  page = 1;
  pageSize = 10;
  total = 0;
  body: any = {};
  /** 行选择 */
  selectedRows?: Array<any> = [];
  selectedRowKeys?: Array<string | number> = [];
  rowSelection: TableRowSelection = rowSelection.bind(this)();
  /** 私有属性 */
  __cacheData: Array<T> = [];

  /**
   * tableInnerScroll 更新重新更新 scroll值
   */
  @Watch('tableInnerScroll')
  onTableInnerScrollChange() {
    this.resize();
  }

  created() {
    this.getDataSource();
  }

  mounted() {
    if (this.tableInnerScroll) {
      this.resize();
      window.onresize = () => this.resize();
    } else {
      this.scroll.y = 0;
    }
  }

  resize() {
    if (this.tableInnerScroll) {
      this.$nextTick(() => {
        setTimeout(() => {
          const $els = document.querySelectorAll('.table-card');
          if ($els) {
            $els.forEach($el => {
              const $antTableEl = $el.querySelector('.ant-table-wrapper');
              if ($antTableEl) {
                const $antTableHeaderEl = $antTableEl.querySelector(
                  '.ant-table-header'
                );
                const $antTableTheadEl = $antTableEl.querySelector(
                  '.ant-table-body .ant-table-thead'
                );
                this.scroll.y =
                  $antTableEl.clientHeight -
                  ($antTableHeaderEl ? $antTableHeaderEl.clientHeight : 0) -
                  ($antTableTheadEl ? $antTableTheadEl.clientHeight : 0) -
                  this.paginationHeight; // ant-table-pagination
              }
            });
          } else {
            this.scroll.y = 0;
          }
        }, 0);
      });
    } else {
      this.scroll.y = 0;
    }
  }

  /**
   * 列表查询
   */
  getDataSource() {
    this.loading = true;
    return this.$http
      .get(this.dataSourceUrl, {
        params: {
          page: this.page - 1,
          size: this.pageSize,
          ...this.body
        }
      })
      .then(({ data }) => {
        this.loading = false;
        this.dataSource = data.content;
      })
      .catch(() => {
        this.loading = false;
      });
  }
}
