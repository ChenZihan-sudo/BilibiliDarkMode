var frame = `
       <div></div>
        <script>
            var node = document.createElement("a");
            node.innerText = "下载";
            node.id = "downPic";
            node.style = "color: rgb(225, 225, 225);font-size: 13px;height: 40px;width: 60px;display: flex;align-items: center;background: #333333;border-radius: 12px;justify-content: center;";
            node.href = "http://i0.hdslb.com/bfs/archive/4e0572c7e01bca2dd08bb41b797276db0130d158.jpg";
            node.download = "cover_"  + ".png"
            document.body.appendChild(node)
            var img = document.createElement("img");
            img.src = "http://i0.hdslb.com/bfs/archive/4e0572c7e01bca2dd08bb41b797276db0130d158.jpg"
            document.body.appendChild(img)
        </script>
    `
with(document) {
    write(frame);
    void(close());
};