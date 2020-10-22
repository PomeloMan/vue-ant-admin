/**
 * 提取目标数据字段并返回新的数据对象
 * @param {*} data 需要提取字段的数据
 * @param {*} options 需要提取的字段及映射 { alias: { newkey: key } }
 *
 * @returns obj | array
 *
 * @example
 *  提取数据 { name, id } 字段，返回 { title, value, key }
 *  data: [{"id":1,"parentId":0,"name":"服装","level":0,"productCount":100,"productUnit":"件","navStatus":1,"showStatus":1,"sort":1,"icon":null,"keywords":"服装","description":null,"children":[{"id":7,"parentId":1,"name":"外套","level":1,"productCount":100,"productUnit":"件","navStatus":1,"showStatus":1,"sort":0,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/product_cate_waitao.png","keywords":"外套","description":null,"visible":true},{"id":8,"parentId":1,"name":"T恤","level":1,"productCount":100,"productUnit":"件","navStatus":1,"showStatus":1,"sort":0,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/product_cate_tshirt.png","keywords":"T恤","description":null,"visible":true},{"id":9,"parentId":1,"name":"休闲裤","level":1,"productCount":100,"productUnit":"件","navStatus":1,"showStatus":1,"sort":0,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/product_cate_xiuxianku.png","keywords":"休闲裤","description":null,"visible":true},{"id":10,"parentId":1,"name":"牛仔裤","level":1,"productCount":100,"productUnit":"件","navStatus":1,"showStatus":1,"sort":0,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/product_cate_niuzaiku.png","keywords":"牛仔裤","description":null,"visible":true},{"id":11,"parentId":1,"name":"衬衫","level":1,"productCount":100,"productUnit":"件","navStatus":1,"showStatus":1,"sort":0,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/product_cate_chenshan.png","keywords":"衬衫","description":null,"visible":true},{"id":29,"parentId":1,"name":"男鞋","level":1,"productCount":0,"productUnit":"","navStatus":0,"showStatus":0,"sort":0,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/product_cate_xie.png","keywords":"","description":null,"visible":false}],"visible":true},{"id":2,"parentId":0,"name":"手机数码","level":0,"productCount":100,"productUnit":"件","navStatus":1,"showStatus":1,"sort":1,"icon":null,"keywords":"手机数码","description":null,"children":[{"id":19,"parentId":2,"name":"手机通讯","level":1,"productCount":0,"productUnit":"件","navStatus":1,"showStatus":1,"sort":0,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/product_cate_shouji.png","keywords":"手机通讯","description":null,"visible":true},{"id":30,"parentId":2,"name":"手机配件","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/product_cate_peijian.png","keywords":"手机配件","description":null,"visible":true},{"id":31,"parentId":2,"name":"摄影摄像","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/product_cate_sheying.png","keywords":"","description":null,"visible":true},{"id":32,"parentId":2,"name":"影音娱乐","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/product_cate_yule.png","keywords":"","description":null,"visible":true},{"id":33,"parentId":2,"name":"数码配件","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/product_cate_yule.png","keywords":"","description":null,"visible":true},{"id":34,"parentId":2,"name":"智能设备","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/product_cate_zhineng.png","keywords":"","description":null,"visible":true}],"visible":true},{"id":3,"parentId":0,"name":"家用电器","level":0,"productCount":100,"productUnit":"件","navStatus":1,"showStatus":1,"sort":1,"icon":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190129/subject_cate_jiadian.png","keywords":"家用电器","description":null,"children":[{"id":35,"parentId":3,"name":"电视","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true},{"id":36,"parentId":3,"name":"空调","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true},{"id":37,"parentId":3,"name":"洗衣机","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true},{"id":38,"parentId":3,"name":"冰箱","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true},{"id":39,"parentId":3,"name":"厨卫大电","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true},{"id":40,"parentId":3,"name":"厨房小电","level":1,"productCount":0,"productUnit":"","navStatus":0,"showStatus":0,"sort":0,"icon":"","keywords":"","description":null,"visible":false},{"id":41,"parentId":3,"name":"生活电器","level":1,"productCount":0,"productUnit":"","navStatus":0,"showStatus":0,"sort":0,"icon":"","keywords":"","description":null,"visible":false},{"id":42,"parentId":3,"name":"个护健康","level":1,"productCount":0,"productUnit":"","navStatus":0,"showStatus":0,"sort":0,"icon":"","keywords":"","description":null,"visible":false}],"visible":true},{"id":4,"parentId":0,"name":"家具家装","level":0,"productCount":100,"productUnit":"件","navStatus":1,"showStatus":1,"sort":1,"icon":null,"keywords":"家具家装","description":null,"children":[{"id":43,"parentId":4,"name":"厨房卫浴","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true},{"id":44,"parentId":4,"name":"灯饰照明","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true},{"id":45,"parentId":4,"name":"五金工具","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true},{"id":46,"parentId":4,"name":"卧室家具","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true},{"id":47,"parentId":4,"name":"客厅家具","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true}],"visible":true},{"id":5,"parentId":0,"name":"汽车用品","level":0,"productCount":100,"productUnit":"件","navStatus":1,"showStatus":1,"sort":1,"icon":null,"keywords":"汽车用品","description":null,"children":[{"id":48,"parentId":5,"name":"全新整车","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true},{"id":49,"parentId":5,"name":"车载电器","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true},{"id":50,"parentId":5,"name":"维修保养","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true},{"id":51,"parentId":5,"name":"汽车装饰","level":1,"productCount":0,"productUnit":"","navStatus":1,"showStatus":1,"sort":0,"icon":"","keywords":"","description":null,"visible":true}],"visible":true}]
 *  options: {alias: { title: 'name', value: 'id', key: 'id' }}
 *  return [{"title":"服装","value":1,"key":1,"children":[{"title":"外套","value":7,"key":7},{"title":"T恤","value":8,"key":8},{"title":"休闲裤","value":9,"key":9},{"title":"牛仔裤","value":10,"key":10},{"title":"衬衫","value":11,"key":11},{"title":"男鞋","value":29,"key":29}]},{"title":"手机数码","value":2,"key":2,"children":[{"title":"手机通讯","value":19,"key":19},{"title":"手机配件","value":30,"key":30},{"title":"摄影摄像","value":31,"key":31},{"title":"影音娱乐","value":32,"key":32},{"title":"数码配件","value":33,"key":33},{"title":"智能设备","value":34,"key":34}]},{"title":"家用电器","value":3,"key":3,"children":[{"title":"电视","value":35,"key":35},{"title":"空调","value":36,"key":36},{"title":"洗衣机","value":37,"key":37},{"title":"冰箱","value":38,"key":38},{"title":"厨卫大电","value":39,"key":39},{"title":"厨房小电","value":40,"key":40},{"title":"生活电器","value":41,"key":41},{"title":"个护健康","value":42,"key":42}]},{"title":"家具家装","value":4,"key":4,"children":[{"title":"厨房卫浴","value":43,"key":43},{"title":"灯饰照明","value":44,"key":44},{"title":"五金工具","value":45,"key":45},{"title":"卧室家具","value":46,"key":46},{"title":"客厅家具","value":47,"key":47}]},{"title":"汽车用品","value":5,"key":5,"children":[{"title":"全新整车","value":48,"key":48},{"title":"车载电器","value":49,"key":49},{"title":"维修保养","value":50,"key":50},{"title":"汽车装饰","value":51,"key":51}]}]
 */
export function extractFields(data: any, options: any): any {
  if (!data) {
    return data;
  }
  if (data instanceof Array) {
    return data.map(item => {
      const obj: any = extractFields(item, options);
      if (item.children && item.children.length > 0) {
        obj.children = extractFields(item.children, options);
        return obj;
      } else {
        return obj;
      }
    });
  } else {
    const keys = Object.keys(options.alias);
    const obj: any = {};
    keys.forEach(key => {
      obj[key] = data[options.alias[key]];
    });
    return obj;
  }
}

/**
 * 将树形结构合成数组
 * @param data
 */
export function resolveTree(
  data: any,
  resolve = (data: any, result: any) => {
    if (result) {
      if (result instanceof Array) {
        result.forEach(r => {
          data.push(r);
        });
      } else {
        data.push(result);
      }
    }
  }
): Array<any> {
  const result: Array<any> = [];
  if (!data) {
    return data;
  }
  if (data instanceof Array) {
    data.forEach(d => {
      const res = resolveTree(d);
      resolve(result, res);
    });
  } else {
    if (data.children) {
      const res = resolveTree(data.children);
      resolve(result, res);
    } else {
      delete data.children;
      result.push(data);
    }
  }
  return result;
}

/**
 * 动态引入js文件
 * @param path
 * @param innerContent
 */
export function loadScript(path: string, innerContent?: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const onSuccess = (item: any) => {
      resolve(item);
    };
    const onError = (item: any) => {
      reject(item);
    };

    const node: any = document.createElement('script');
    node.type = 'text/javascript';
    node.src = path;
    node.charset = 'utf-8';
    if (innerContent) {
      node.innerHTML = innerContent;
    }
    if (node.readyState) {
      // IE
      node.onreadystatechange = () => {
        if (node.readyState === 'loaded' || node.readyState === 'complete') {
          node.onreadystatechange = null;
          onSuccess({
            path,
            status: 'ok'
          });
        }
      };
    } else {
      node.onload = () =>
        onSuccess({
          path,
          status: 'ok'
        });
    }
    node.onerror = (error: {}) =>
      onError({
        path,
        status: 'error',
        error
      });
    document.getElementsByTagName('head')[0].appendChild(node);
  });
}

/**
 * 动态引入css文件
 * @param path
 * @param rel
 * @param innerContent
 */
export function loadStyle(
  path: string,
  rel = 'stylesheet',
  innerContent?: string
): Promise<any> {
  return new Promise(resolve => {
    const node = document.createElement('link') as HTMLLinkElement;
    node.rel = rel;
    node.type = 'text/css';
    node.href = path;
    if (innerContent) {
      node.innerHTML = innerContent;
    }
    document.getElementsByTagName('head')[0].appendChild(node);
    const item = {
      path,
      status: 'ok'
    };
    resolve(item);
  });
}

/**
 * 动态引入js，css文件
 * @param paths
 */
export function load(paths: string | string[]): Promise<any> {
  if (!Array.isArray(paths)) {
    paths = [paths];
  }
  const promises: Array<Promise<{
    path: string;
    status: 'ok' | 'error' | 'loading';
    error?: {};
  }>> = [];

  paths.forEach(path => {
    if (path.endsWith('.js')) {
      promises.push(loadScript(path));
    } else {
      promises.push(loadStyle(path));
    }
  });

  return Promise.all(promises).then(res => {
    return Promise.resolve(res);
  });
}
