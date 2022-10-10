// 首页相关
import $http from '@/utils/server'
/** 获取首页分类文章
 * @description:type_id:类型id (0=发现,1=类型id, ...)
 * recom:1=推荐,2=关注
 * page:分页页码，数字类型
 * search_text:搜索传递 (不必填)
 * @author: qi-you
 * @return {*}
 */
function getSingleText(data) {
  return $http.request({
    url: '/api/SingleText/getSingleText',
    method: 'post',
    data,
  })
}
/** 获取单条文章
 * @description:type_id:类型id (0=发现,1=类型id, ...)
 * page:分页页码，数字类型
 * @author: qi-you
 * @return {*}
 */
function getSingleTextInfo(data) {
  return $http.request({
    url: '/api/SingleText/getSingleTextInfo',
    method: 'post',
    data,
  })
}

export default {
  getSingleText,
  getSingleTextInfo,
}
