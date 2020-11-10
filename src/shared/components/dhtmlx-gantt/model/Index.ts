// 甘特图任务
export interface Task {
  id: number; // 任务ID
  text: string; // 任务名称
  start_date: string; // 任务开始时间
  duration: number; // 任务持续时间
  progress: number; // 任务进度(0~1)
  parent: number; // 父任务ID
  open: boolean;
}
// 甘特图链接
export interface Link {
  id: number; // 链接ID
  source: number; // 源任务ID
  target: number; // 目标任务ID
  type: number; // 链接类型
}
