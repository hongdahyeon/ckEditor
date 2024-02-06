package ckEditor.hong.ckEditor.domain.hongPost;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HongPostRepository extends JpaRepository<HongPost, Long> {

    List<HongPost> findAllByDelYnIs(String delYn);
}