package ckEditor.hong.ckEditor.domain.hongPost;

import ckEditor.hong.ckEditor.domain.hongPost.dto.HongPostDTO;
import ckEditor.hong.ckEditor.domain.hongPost.vo.HongPostVO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface HongPostService {

    Long join(HongPostDTO dto);

    void delete(Long id);

    List<HongPostVO> list();

    HongPostVO view(Long id);

    void edit(Long id, HongPostDTO dto);

    Map<String, Object> uploadCKImageFile(MultipartFile multipartFile);
}