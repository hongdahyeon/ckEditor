package ckEditor.hong.ckEditor.domain.hongPost;


import ckEditor.hong.ckEditor.domain.hongPost.dto.HongPostDTO;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "hong_post")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HongPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hong_post_id")
    private Long id;

    private String title;
    private String content;
    private String delYn;

    @Builder(builderMethodName = "hongPostInsertBuilder")
    public HongPost(String title, String content) {
        this.title = title;
        this.content = content;
        this.delYn = "N";
    }

    public void deletePost(){
        this.delYn = "Y";
    }

    public void updatePost(HongPostDTO dto){
        this.title = dto.getTitle();
        this.content = dto.getContent();
    }
}