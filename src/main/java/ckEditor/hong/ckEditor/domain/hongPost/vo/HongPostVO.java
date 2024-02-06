package ckEditor.hong.ckEditor.domain.hongPost.vo;

import ckEditor.hong.ckEditor.domain.hongPost.HongPost;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class HongPostVO {

    private Long id;
    private String title;
    private String content;

    public HongPostVO(HongPost hongPost) {
        this.id = hongPost.getId();
        this.title = hongPost.getTitle();
        this.content = hongPost.getContent();
    }
}