package com.popble.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.popble.domain.PopupStore;
import com.popble.domain.Reservation;
import com.popble.domain.ReservationTime;
import com.popble.domain.UserProfile;
import com.popble.dto.ReservationDTO;
import com.popble.repository.PopupStoreRepository;
import com.popble.repository.ReservationRepository;
import com.popble.repository.ReservationTimeRepository;
import com.popble.repository.UserProfileRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ReservationServiceImpl implements ReservationService{

    private final UserProfileRepository userProfileRepository;

    private final PopupStoreRepository popupStoreRepository;
	
	private final ReservationRepository reservationRepository;
	
	private final ReservationTimeRepository reservationTimeRepository;

  
	
	@Override
    public Long register(ReservationDTO dto) {
        Reservation reservation = dtoToEntity(dto);
        reservationRepository.save(reservation);
        return reservation.getId();
    }

    @Override
    public ReservationDTO get(Long id) {
        return reservationRepository.findById(id)
                .map(this::entityToDto)
                .orElse(null);
    }

    @Override
    public List<ReservationDTO> getByPopupStore(Long popupStoreId) {
        List<Reservation> reservations = reservationRepository.findByPopupStoreId(popupStoreId);
        return reservations.stream()
                .map(this::entityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public void cancel(Long id) {
        reservationRepository.deleteById(id);
    }

    private Reservation dtoToEntity(ReservationDTO dto) {
    	
    	PopupStore popupStore = popupStoreRepository.findById(dto.getPopupStoreId())
    	        .orElseThrow(() -> new IllegalArgumentException("Invalid popupStoreId"));

    	    UserProfile user = userProfileRepository.findById(dto.getUserId())
    	        .orElseThrow(() -> new IllegalArgumentException("Invalid userId"));

    	    ReservationTime reservationTime = reservationTimeRepository.findByTime(dto.getReservationTime())
    	        .orElseThrow(() -> new IllegalArgumentException("Invalid reservationTime"));
    	    
        return Reservation.builder()
        		.id(dto.getId())
                .popupStore(popupStoreRepository.findById(dto.getPopupStoreId())
                		.orElseThrow(()-> new IllegalArgumentException("Invalid popupstoreId")))
                .userProfile(userProfileRepository.findById(dto.getUserId())
                		.orElseThrow(()-> new IllegalArgumentException("Invalid userId")))    
                .reservationCount(dto.getReservationCount())
                .createDateTime(dto.getCreateDateTime())
                .phonenumber(dto.getPhonenumber())
                .build();
    }

    private ReservationDTO entityToDto(Reservation entity) {
        return ReservationDTO.builder()
                .id(entity.getId())
                .popupStoreId(entity.getPopupStore().getId())
                .userId(entity.getUserProfile().getId())
                .reservationCount(entity.getReservationCount())
                .createDateTime(entity.getCreateDateTime())
                .phonenumber(entity.getPhonenumber())
                .build();
    }

}
