;(function () {
  'use strict'

  const get = (target) => {
    return document.querySelector(target)
  }

  let page = 1
  const limit = 10
  const $posts = get('.posts')
  const $loader = get('.loader')
  const end = 100
  let total = 10

  const getPost = async () => {
    const API_URL = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
    const response = await fetch(API_URL)
    if (!response.ok) {
      return new Error('에러')
    }
    return await response.json()
  }

  const showPosts = (posts) => {
    posts.forEach((post) => {
      const $post = document.createElement('div')
      $post.classList.add('post')
      $post.innerHTML = `
      <div class="header">
        <div class="id">${post.id}</div>
        <div class="title">${post.title}</div>
      </div>
      <div class="body">
        ${post.body}
      </div>
      `
      $posts.appendChild($post)
    })
  }

  const showLoader = () => {
    $loader.classList.add('show')
  }

  const hideLoader = () => {
    $loader.classList.remove('show')
  }

  const loadPost = async () => {
    showLoader()
    // 로딩 엘리먼트를 보여줌
    try {
      const response = await getPost()
      showPosts(response)
    } catch (error) {
      console.erroe(error)
    } finally {
      // 로딩 엘리먼트를 사라지게함
      hideLoader()
    }
  }

  const onScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement

    if (total === end) {
      window.removeEventListener('scroll', onScroll)
      return
    }

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      page++
      total += 10
      loadPost()
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    loadPost()
    window.addEventListener('scroll', onScroll)
  })
})()
