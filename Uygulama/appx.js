window.addEventListener('load', () => {
    window.vue = new Vue({
        el: '#app',
        data: {
            message: 'Hello!',
            isLoggedIn: true,
            username: 'ibo'
        }
    })
})