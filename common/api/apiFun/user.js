// 用户相关
import $http from '@/utils/server'

/** 登入
 * @description:phone:手机号-password:
 * @author: qi-you
 * @return {*}
 */
function login(data) {
  return $http.request({
    url: '/api/user/login',
    method: 'post',
    data,
  })
}
/** 查看用户信息
 * @description:user_id:用户id
 * @author: qi-you
 * @return {*}
 */
function loadUserInfo(data) {
  return $http.request({
    url: '/api/user/loadUserInfo',
    method: 'post',
    data,
  })
}
/** 关注/取关
 * @description:user_id:用户id-type:1=关注,2=取关
 * @author: qi-you
 * @return {*}
 */
function operateFootprint(data) {
  return $http.request({
    url: '/api/FootprintUser/operateFootprint',
    method: 'post',
    data,
  })
}
/** 获取登录用户信息
 * @description:
 * @author: qi-you
 * @return {*}
 */
function getUserInfo(data) {
  return $http.request({
    url: '/api/user/index',
    method: 'post',
    data,
  })
}
/** 获取用户文章
 * @description:user_id:用户id-page:分页页码，数字类型
 * @author: qi-you
 * @return {*}
 */
function getUserSingleText(data) {
  return $http.request({
    url: '/api/SingleText/getUserSingleText',
    method: 'post',
    data,
  })
}
/** 获取浏览记录
 * @description:page:分页页码，数字类型
 * @author: qi-you
 * @return {*}
 */
function getFootprintArticle(data) {
  return $http.request({
    url: '/api/UserFootprintArticle/getFootprintArticle',
    method: 'post',
    data,
  })
}
/** 关于我们
 * @description
 * @author: qi-you
 * @return {*}
 */
function aboutUs() {
  return $http.request({
    url: '/api/user/aboutUs',
    method: 'post',
  })
}
/** 联系我们
 * @description
 * @author: qi-you
 * @return {*}
 */
function contactUs() {
  return $http.request({
    url: '/api/user/contactUs',
    method: 'post',
  })
}
/** 我的相册
 * @description page:1
 * @author: qi-you
 * @return {*}
 */
function getPhotoAlbum() {
  return $http.request({
    url: '/api/SingleText/getPhotoAlbum',
    method: 'post',
  })
}
/** 用户经常访问
 * @description type:显示条数 1=部分,2=全部
 * @author: qi-you
 * @return {*}
 */
function getAccessRecords(data) {
  return $http.request({
    url: '/api/UserFootprintArticle/getAccessRecords',
    method: 'post',
    data,
  })
}
/** 不看此博主
 * @description user_id
 * @author: qi-you
 * @return {*}
 */
function shieldUser(data) {
  return $http.request({
    url: '/api/UserShieldUser/shieldUser',
    method: 'post',
    data,
  })
}
//获取签到页信息
function getSignInInfo() {
  return $http.request({
    url: '/api/user/getSignInInfo',
    method: 'POST',
  })
}
// 获取答题题目
function getSignInTopic() {
  return $http.request({
    url: '/api/user/getSignInTopic',
    method: 'POST',
  })
}
// 提交答题
function submitTheAnswer(id, item) {
  return $http.request({
    url: '/api/user/submitTheAnswer',
    method: 'POST',
    data: {
      sign_in_id: id,
      sign_in_content: item,
    },
  })
}
/** 为你推荐
 * @description user_id
 * @author: qi-you
 * @return {*}
 */
function recommendUser(data) {
  return $http.request({
    url: '/api/user/recommendUser',
    method: 'post',
    data,
  })
}

function editPersonalInfo(data) {
  return $http.request({
    url: '/api/user/editPersonalInfo',
    method: 'POST',
    data,
  })
}
//获取投票时间
function getBanker() {
  return $http.request({
    url: '/api/Banker/getBanker',
    method: 'POST',
  })
}
//期数内容
function getProject(type) {
  return $http.request({
    url: '/api/Banker/getProject',
    method: 'POST',
    data: {
      type: type,
    },
  })
}

function getProjectInfo(id) {
  return $http.request({
    url: '/api/Banker/getProjectInfo',
    method: 'POST',
    data: {
      project_id: id,
    },
  })
}
//提交投票
function submitAVote(id, vote) {
  return $http.request({
    url: '/api/Banker/submitAVote',
    method: 'POST',
    data: {
      project_id: id,
      vote: vote,
    },
  })
}
// 投票日志
function getVoteLog() {
  return $http.request({
    url: '/api/Banker/getVoteLog',
    method: 'POST',
  })
}
// 搜索用户
function searchUser(data) {
  return $http.request({
    url: '/api/user/searchUser',
    method: 'POST',
    data,
  })
}
/** 获取收藏页面
 * @description:
 * @author: qi-you
 * @param {*} data
 * @return {*}
 */
function getCollectArticle(data) {
  return $http.request({
    url: '/api/UserCollectArticle/getCollectArticle',
    method: 'POST',
    data,
  })
}
/** 关注/粉丝
 * @description:
 * @author: qi-you
 * @param {*} data page: 分页页码，数字类型,type:1=关注,2=粉丝
 * @return {*}
 */
function getFocusOnList(data) {
  return $http.request({
    url: '/api/user/getFocusOnList',
    method: 'POST',
    data,
  })
}
export default {
  loadUserInfo,
  operateFootprint,
  getUserInfo,
  login,
  getUserSingleText,
  getFootprintArticle,
  aboutUs,
  contactUs,
  getPhotoAlbum,
  getAccessRecords,
  shieldUser,
  getSignInInfo,
  recommendUser,
  submitTheAnswer,
  getSignInTopic,
  editPersonalInfo,
  getBanker,
  getProject,
  getProjectInfo,
  submitAVote,
  getVoteLog,
  searchUser,
  getCollectArticle,
  getFocusOnList,
}
