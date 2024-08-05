<script>
import axios from 'axios'

export default {
    data() {
        return {
            isDragging: false,
            file: null,
            uploadSuccess: false,
        };
    },
    methods: {
        async onChange() {
            this.file = this.$refs.file.files[0];
            if (this.file && this.file.name.endsWith('.ics')) {
                const formData = new FormData();
                formData.append('file', this.file);

                try {
                    const response = await axios.post('http://localhost:3000/api/uploadFile', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    console.log('File uploaded successfully:', response.data);
                    this.uploadSuccess = true
                    this.emitter.emit("uploadStatus", { status: this.uploadSuccess });
                } catch (error) {
                    console.error('Error uploading file:', error);
                    this.uploadSuccess = false
                    this.emitter.emit("uploadStatus", { status: this.uploadSuccess });
                }
            } else {
                console.error('Invalid file type. Only .ics files are allowed.');
                this.uploadSuccess = false
                this.emitter.emit("uploadStatus", { status: this.uploadSuccess });
            }
        },
        dragover(e) {
            e.preventDefault();
            this.isDragging = true;
        },
        dragleave() {
            this.isDragging = false;
        },
        drop(e) {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file && file.name.endsWith('.ics')) {
                this.file = file;
                this.$refs.file.files = e.dataTransfer.files;
                this.onChange();
            } else {
                console.error('Invalid file type. Only .ics files are allowed.');
            }
            this.isDragging = false;
        },
    },
};
</script>

<template>
    <div 
        class="border-dashed rounded-lg border-2 h-1/4 w-1/4 mx-auto mt-10 flex justify-center items-center text-gray-400 text-4xl hover:border-gray-700 hover:text-gray-600"
        :class="{ 'border-green-500': uploadSuccess, 'border-gray-500': !uploadSuccess }"
        @dragover="dragover" 
        @dragleave="dragleave" 
        @drop="drop">
        <label for="fileInput" class="file-label w-full h-full text-center h-64 w-64 flex flex-col justify-center items-center">
            <div v-if="uploadSuccess">✔</div>
            <div v-else>+</div>
        </label>
    </div>
    <input 
        type="file" 
        multiple 
        name="file" 
        id="fileInput" 
        class="hidden" 
        @change="onChange" 
        ref="file" 
        accept=".ics" />
    <div class="w-1/4 mx-auto flex justify-center">
        <label for="fileInput" class="file-label">
            <div v-if="isDragging">Release to drop files here.</div>
            <div v-else>Drop .ics file here or click to upload.</div>
        </label>
    </div>
</template>
<style>
    .hidden{
        display:none
    }
</style>
