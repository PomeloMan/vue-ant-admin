import zh from './zh';

/**
 * 1.翻译文本 bpmnTranslate('Start Event') => '开始事件'
 * 2.翻译模板 bpmnTranslate('Create {type}', { type: '开始事件' }) => '创建 开始事件'
 * @param {*} template 
 * @param {*} replacements 
 */
export default function bpmnTranslate(template, replacements) {
  replacements = replacements || {};

  // Translate
  template = zh[template] || template;

  // Replace
  return template.replace(/{([^}]+)}/g, function(_, key) {
    return replacements[key] || '{' + key + '}';
  });
}
