// 共公
import $http from '@/utils/server'
/** 图片上传
 * @description:type :avatar=头像,single_text=文章图片,video=视频
 * file
 * @author: qi-you
 * @return {*}
 */
function uploadPicture(data) {
  return $http.request({
    url: '/api/common/uploadPicture',
    method: 'post',
    data,
  })
}

export default {
  uploadPicture,
}
