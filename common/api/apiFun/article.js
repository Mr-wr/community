// 文章相关
import $http from '@/utils/server'

function getToke() {
  if (uni.getStorageSync('token')) {
    return uni.getStorageSync('token')
  } else {
    uni.reLaunch({
      url: '/pages/login/index',
    })
  }
}

/** 发布图片/发布说说
 * @description:type_id：类型id、state：1=公开,2=仅关注的人可见,3=仅自己可见、content：测试内容
 * file_address[] 图片地址
 * @author: qi-you
 * @return {*}
 */
function postSingleText(data) {
  return $http.request({
    url: '/api/SingleText/postSingleText',
    header: {
      'Content-Type': 'application/json',
      token: getToke(),
    },
    method: 'post',
    data,
  })
}
/** 点赞/取消点赞
 * @description:type：1=点赞,2=取消点赞、single_id：短文id
 * @author: qi-you
 * @return {*}
 */
function like(data) {
  return $http.request({
    url: '/api/SingleText/like',
    method: 'post',
    data,
  })
}
/** 评论/删除评论
 * @description:single_id-短文id，type:1=发布,2=删除，information-评论信息 type=1(评论内容) type=2(_reply_id)
 * file_address[]-媒体文件
 * @author: qi-you
 * @return {*}
 */
function comment(data) {
  return $http.request({
    header: {
      'Content-Type': 'application/json',
      token: getToke(),
    },
    url: '/api/SingleText/comment',
    method: 'post',
    data,
  })
}
/** 加载评论
 * @description:single_id-短文id，type:加载 1，评论 2，回复（暂无），reply_id(不必填):评论id type=2时必须传递
 * @author: qi-you
 * @return {*}
 */
function loadCommentReply(data, iShowLoading = true) {
  return $http.request({
    url: '/api/SingleText/loadCommentReply',
    method: 'post',
    data,
    iShowLoading,
  })
}
/** 获取类型
 * @description:
 * @author: qi-you
 * @return 返回
 * "data": [
		{
			"single_type_id": 1,
			"single_type_name": "快讯"
		},
		{
			"single_type_id": 2,
			"single_type_name": "区块链"
		},
		{
			"single_type_id": 3,
			"single_type_name": "项目"
		},
		{
			"single_type_id": 4,
			"single_type_name": "NFT"
		},
		{
			"single_type_id": 5,
			"single_type_name": "元宇宙"
		}
	],
 */
function getSingleType(data) {
  return $http.request({
    url: '/api/SingleType/getSingleType',
    method: 'post',
    data,
  })
}
/** 热门搜索
 * @description:
 * @author: qi-you
 * @return 返回
 *
 */
function getSearchLog(data) {
  return $http.request({
    url: '/api/SearchLog/getSearchLog',
    method: 'post',
    data,
  })
}
/** 不感兴趣
 * @description:single_id:短文id
 * @author: qi-you
 * @return 返回
 *
 */
function shieldArticle(data) {
  return $http.request({
    url: '/api/UserShieldArticle/shieldArticle',
    method: 'post',
    data,
  })
}
/** 不感兴趣
 * @description:option_id:获取投诉类型 = 0, 获取详情选项 = 类型id
 * @author: qi-you
 * @return 返回
 *
 */
function getComplaintOption(data) {
  return $http.request({
    url: '/api/ComplaintOption/getComplaintOption',
    method: 'post',
    data,
  })
}
/** 提交投诉
 * @description:single_id:短文id ,option_id:类型,info_id:详细分类
 * @author: qi-you
 * @return 返回
 *
 */
function setComplaintArticle(data) {
  return $http.request({
    url: '/api/ComplaintArticle/setComplaintArticle',
    method: 'post',
    data,
  })
}
/** 搜索广告位
 * @description:
 * @author: qi-you
 * @return 返回
 *
 */
function getAdvertise(data) {
  return $http.request({
    url: '/api/singleText/getAdvertise',
    method: 'post',
    data,
  })
}

// 收藏
function setCollectArticle(data) {
  return $http.request({
    url: '/api/UserCollectArticle/setCollectArticle',
    method: 'POST',
    data,
  })
}
// 回复|删除
function reply(data) {
  return $http.request({
    header: {
      'Content-Type': 'application/json',
      token: getToke(),
    },
    url: '/api/singleText/reply',
    method: 'POST',
    data,
  })
}
/** 评论/回复 点赞|删除
 * @description:reply_id:评论|回复 id,type:1=点赞,2=取消,single_id:文章id
 * @author: qi-you
 * @param {*} data
 * @return {*}
 */
function commentReplyLike(data) {
  return $http.request({
    url: '/api/singleText/commentReplyLike',
    method: 'POST',
    data,
  })
}

export default {
  postSingleText,
  like,
  getSingleType,
  comment,
  loadCommentReply,
  getSearchLog,
  shieldArticle,
  getComplaintOption,
  setComplaintArticle,
  getAdvertise,
  setCollectArticle,
  reply,
  commentReplyLike,
}
