<template>
    <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="enable">
            <div class="fixed inset-0 flex items-start justify-center bg-black bg-opacity-20 z-50">
                <div 
                    class=" text-white mt-8 p-4 rounded-lg shadow-lg w-1/6 relative text-center" 
                    :class="{ 'bg-green-500': uploadStatus, 'bg-red-500': !uploadStatus }">
                    <h2 v-if="uploadStatus" class="text-xl">Upload successfully</h2>
                    <h2 v-else class="text-xl">Error</h2>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            uploadStatus: false,
            enable: false
        };
    },
    mounted() {
        this.emitter.on("uploadStatus", (data) => {
            this.uploadStatus = data.status;
            this.enable = true
            setTimeout(() => {
                this.enable = false;
            }, 1000);
        });
    },
    methods: {
        beforeEnter(el) {
            el.style.opacity = 0;
        },
        enter(el, done) {
            el.offsetHeight;
            el.style.transition = 'opacity 0.8s';
            el.style.opacity = 1;
            done();
        },
        leave(el, done) {
            el.style.transition = 'opacity 0.8s';
            el.style.opacity = 0;
            el.addEventListener('transitionend', done, { once: true });
        }
    }
};
</script>