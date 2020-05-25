<template>
    <div id="video-listing">
        <div class="container">
            <div class="video-list">

                <VideoItem v-for="(video, index) in videos" :key="index" :video="video"></VideoItem>


            </div>
        </div>
    </div>
</template>

<script>
import VideoItem from './VideoItem'
    export default {
        name:'video-listing',
        components: {
            VideoItem,
        },
        props: ['videos']

    }
</script>

<style lang="less" scoped>

#video-listing {
    width: 100%;
    .video-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        grid-template-rows: repeat(2, 300px);
        grid-column-gap: 1rem;
        grid-row-gap: 1rem;

    }
}

</style>